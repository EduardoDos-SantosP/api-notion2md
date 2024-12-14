const express = require("express");
const { Client, APIResponseError } = require("@notionhq/client");
const { NotionToMarkdown } = require("notion-to-md");
const { configDotenv } = require("dotenv");

configDotenv();

const app = express();

app.use(express.json());

app.get("/v1/notion-to-md/:blockId", async (req, res) => {
    const { blockId } = req.params;
    const notionApiKeyHeader = "notion-api-key"
    const notionApiToken = req.headers[notionApiKeyHeader]?.toString();

    if (!notionApiToken)
        return res.status(401).send({
            error: `O Header "${notionApiKeyHeader}" é obrigatório`
        });

    try {
        const notion = new Client({ auth: notionApiToken });
        const n2m = new NotionToMarkdown({ notionClient: notion });

        const mdBlocks = await n2m.pageToMarkdown(blockId);
        const mdString = n2m.toMarkdownString(mdBlocks).parent;

        return res.status(200).send({ markdown: mdString });
    } catch (error) {
        console.error("Erro ao processar o bloco do Notion:", error.message);
        if (APIResponseError.isAPIResponseError(error)) {
            return res.status(error.status).send({
                error: JSON.parse(error.body).message,
            });
        }
        return res.status(500).send({
            error: "Não foi possível converter o bloco do Notion para Markdown.",
            details: error.stack,
        });
    }
});

app.listen(process.env.PORT || 3000, () => {
    console.log(`Servidor rodando na porta ${process.env.PORT || 3000}`);
});
