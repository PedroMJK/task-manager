require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const taskRoutes = require("./routes/taskRoutes");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors()); 
app.use(cors({ origin: 'http://localhost:3000' }));

app.use(express.json());

app.get("/", (req, res) => {
    res.send("API funcionando!");
});

// Conectar ao MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ Conectado ao MongoDB Atlas"))
  .catch((error) => console.error("❌ Erro ao conectar:", error));

app.use("/api/tasks", taskRoutes);  

app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
});
