import express from "express";
import productsRouter from "./routes/products.router.js"
import cartsRouter from "./routes/carts.router.js"
import handlebars from "express-handlebars";
import { Server } from "socket.io";
import __dirname from "./utils.js";
import viewsRouter from "./routes/views.router.js"
import mongoose from "mongoose";
import messageDao from "./daos/dbManager/message.dao.js";
// import { allowInsecurePrototypeAccess } from "@handlebars/allow-prototype-access";



const app = express();
const PORT = 8080;

mongoose.connect('mongodb+srv://Nicolas:nicolas123@cluster0.bgr14zx.mongodb.net/?retryWrites=true&w=majority')
.then(() => {
    console.log('Connection success');
})
.catch(error => {
    console.error('Connection fail', error);
});

const httpServer = app.listen(8080, () => {console.log(`Server listening on port ${PORT}`)});

const io = new Server(httpServer);

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.engine("hbs", handlebars.engine({
    extname: ".hbs",
    defaultLayout: "main",
    // handlebars: allowInsecurePrototypeAccess(handlebars)
    runtimeOptions: {
      allowProtoPropertiesByDefault: true,
      allowProtoMethodsByDefault: true,
    }
})
);

app.set("view engine", "hbs");
app.set("views", `${__dirname}/views`);

app.use(express.static(`${__dirname}/public`))

io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('disconnect', () => {
      console.log('user disconnected');
    });
});

io.on('connection', (socket) => {
    socket.on('chat message', async (data) => {
      try {
        await messageDao.createMessage(data.user, data.content);
        io.emit('chat message', data);
      } 
      catch(error) {
        console.log(error);
        res.json({
            error,
            message: "Error"
        });
    }
    });
  });

app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);
app.use("/", viewsRouter);


