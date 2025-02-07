import { Router } from "express";
import { main } from "../helpers/generator";

const router = Router();

router.post("/", async (req, res) => {
  const { html } = req.body;
  console.log("HTML", html);

  if (!html) {
    res.status(400).send("HTML is required");
    return;
  }
  const pdf = await main(html);
  res.setHeader("Content-Disposition", "attachment; filename=document.pdf");
  res.contentType("application/pdf");
  res.send(pdf);
});

export default router;
