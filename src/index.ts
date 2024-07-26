import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import path from "path";

dotenv.config()
const app = express()
const port = process.env.PORT ?? 3000

app.use(cors())
app.use(express.json({ limit: '50mb' }))
app.use(express.urlencoded({ extended: false, limit: '50mb' }))

app.use(express.static(path.join('./public')))
app.use('/images', express.static(path.join('./images')))

app.listen(port, () => {
  console.log(`Server is listening on port ${port}!`)
})
