import fs from "fs";

import { remark } from "remark";

import dotenv from "dotenv";
dotenv.config()

const parent_json_file_name = process.env.PARENT_JSON_FILE_NAME;
const parent_json_file_path = "./parent_json/" + parent_json_file_name + ".json";
const prompt_paraphrase_json_file_path = "./prompts_paraphrase_json/" + parent_json_file_name + "_p_paraphrase.json";

fs.readFile(parent_json_file_path, "utf8", (readErr, questions_data) => {
  if (readErr) {
    console.error("Error reading the file:", readErr);
    return;
  }

  let questions_data_json = JSON.parse(questions_data);

  fs.readFile("./prompt1.md", "utf8", (err, prompt) => {
    if (err) {
      console.error("Error reading the file:", err);
      return;
    }

    questions_data_json.forEach((questionObj) => {
      let problem_text = questionObj["problem_text"];
      let short_text = questionObj["short_text"];
      let input_format = questionObj["input_format"];
      let output_format = questionObj["output_format"];
      let constraints = questionObj["constraints"];
      

      let description = "";

      let problem_prompt = prompt.replace("{{problem_text}}", problem_text);
      problem_prompt = problem_prompt.replace("{{input_format}}", input_format);
      problem_prompt = problem_prompt.replace("{{output_format}}", output_format);
      problem_prompt = problem_prompt.replace("{{constraints}}", constraints);

      remark().process(problem_prompt, (err, file) => {
        if (err) throw err;
        description = String(file);
      });

      questionObj.prompt = problem_prompt;
    });

    const updatedJsonData = JSON.stringify(questions_data_json, null, 2);

    fs.writeFile(prompt_paraphrase_json_file_path, updatedJsonData, "utf8", (err) => {
      if (err) {
        console.error("Error writing file:", err);
        return;
      }

      console.log("Questions With Prompts JSON file updated successfully");
    });
  });
});
