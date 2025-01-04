import express from "express";
import conversionController from "./controllers/conversion";

const PORT = 5001;

class Application {
	static async main() {
		const app = express();

		app.use(express.json());
		app.use("/conversion", conversionController);

		app.get("/", (req, res) => {
			res.send("Hello World");
		});

		app.listen(PORT, () => {
			console.log(`App is running on port ${PORT}`);
		});
	}
}

export default Application;
