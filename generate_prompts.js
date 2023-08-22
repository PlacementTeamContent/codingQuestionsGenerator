import fs from "fs";

import { remark } from "remark";

import dotenv from "dotenv";
dotenv.config()

const parent_json_file_name = process.env.PARENT_JSON_FILE_NAME;
const parent_json_file_path = "./parent_json/" + parent_json_file_name + ".json";
const prompts_file_path = "./prompts_json/" + parent_json_file_name + "_prompts.json";

fs.readFile(parent_json_file_path, "utf8", (readErr, questions_data) => {
  if (readErr) {
    console.error("Error reading the file:", readErr);
    return;
  }

  let questions_data_json = JSON.parse(questions_data);

  fs.readFile("./prompt.md", "utf8", (err, prompt) => {
    if (err) {
      console.error("Error reading the file:", err);
      return;
    }

    questions_data_json.forEach((questionObj) => {
      let problem_text = questionObj["problem_text"];
      let short_text = questionObj["short_text"];
      let sample_input = questionObj["sample_input"];
      let sample_output = questionObj["sample_output"];
      let explanation = questionObj["explanation"];
      let constraints = questionObj["constraints"];
      let code_language = questionObj["code_language"];
      let test_case_1 = questionObj["test_case_1"];
      let test_case_2 = questionObj["test_case_2"];

      let description = "";

      let problem_prompt = prompt.replace("{{problem_text}}", problem_text);
      problem_prompt = problem_prompt.replace("{{sample_input}}", sample_input);
      problem_prompt = problem_prompt.replace("{{sample_output}}", sample_output);
      problem_prompt = problem_prompt.replace("{{explanation}}", explanation);
      problem_prompt = problem_prompt.replace("{{constraints}}", constraints);
      problem_prompt = problem_prompt.replace("{{code_language}}", code_language);

      remark().process(problem_prompt, (err, file) => {
        if (err) throw err;
        description = String(file);
      });

      questionObj.prompt = problem_prompt;
    });

    const updatedJsonData = JSON.stringify(questions_data_json, null, 2);

    fs.writeFile(prompts_file_path, updatedJsonData, "utf8", (err) => {
      if (err) {
        console.error("Error writing file:", err);
        return;
      }

      console.log("Questions With Prompts JSON file updated successfully");
    });
  });
});
