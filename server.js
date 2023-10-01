const http = require("http");
const path = require("path");
const Koa = require("koa");
const cors = require("koa2-cors");
const koaBody = require("koa-body");
const koaStatic = require("koa-static");
const Router = require("koa-router");
const { nanoid } = require("nanoid");
const Notes = require("./js/Notes");

const app = new Koa();

app.use(
  cors({
    origin: "*",
    credentials: true,
    "Access-Control-Allow-Origin": true,
    allowMethods: ["GET", "POST", "PUT", "DELETE"],
  })
);

app.use(
  koaBody({
    text: true,
    urlencoded: true,
    multipart: true,
    json: true,
  })
);

const dirPublic = path.join(__dirname, "/public");
app.use(koaStatic(dirPublic));

const router = new Router();
app.use(router.routes()).use(router.allowedMethods());

const notesList = [
  {
    id: nanoid(),
    content: "ЗАМЕТКА ПРО ВСЯКОЕ",
  },
  {
    id: nanoid(),
    content:
      "АААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААА <<<<========== ПСИХ",
  },
];

const notes = new Notes(notesList);

router.get("/notes", async (ctx) => {
  ctx.response.body = JSON.stringify(notes.list);
});

router.delete("/notes/:id", async (ctx) => {
  notes.remove(ctx.params.id);
  ctx.response.body = JSON.stringify({
    success: true,
    result: "Заметка удалена",
  });
});

router.post("/notes", async (ctx) => {
  const { content } = JSON.parse(ctx.request.body);
  notes.add(content);

  ctx.response.body = JSON.stringify({
    success: true,
    result: "Заметка добавлена",
  });
});

const port = process.env.PORT || 7070;
const server = http.createServer(app.callback());
// eslint-disable-next-line no-console
server.listen(port, () => console.log("Server started"));
