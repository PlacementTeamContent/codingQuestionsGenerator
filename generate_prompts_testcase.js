import fs from "fs";

import { remark } from "remark";

import dotenv from "dotenv";
dotenv.config()

const parent_json_file_name = process.env.PARENT_JSON_FILE_NAME;
const responses_paraphrase_json_file_path = "./responses_paraphrase_json/" + parent_json_file_name + "_r_paraphrase.json";
const prompt_testcase_json_file_path = "./prompts_testcase_json/" + parent_json_file_name + "_p_testcase.json";

fs.readFile(responses_paraphrase_json_file_path, "utf8", (readErr, questions_data) => {
  if (readErr) {
    console.error("Error reading the file:", readErr);
    return;
  }

  let questions_data_json = JSON.parse(questions_data);

  fs.readFile("./prompt_t.md", "utf8", (err, prompt) => {
    if (err) {
      console.error("Error reading the file:", err);
      return;
    }

    questions_data_json.forEach((questionObj, index) => {
      
      const prompt_response = questionObj["prompt_response"];
      const startIndex = prompt_response.indexOf("```json\n[") + 8;
      const endIndex = prompt_response.lastIndexOf("]\n```");
      console.log(index);
      let prompt_response_str = prompt_response.slice(startIndex, endIndex+1);
      prompt_response_str = prompt_response_str.replaceAll("\\\\n", "\\n");

      const prompt_response_json = JSON.parse(prompt_response_str);
      
      let problem_text = prompt_response_json[0]["problem_text"];
      let short_text = questionObj["short_text"];
      let input_format = prompt_response_json[0]["input_format"] || "";
      let output_format = prompt_response_json[0]["output_format"] || "";
      let constraints = prompt_response_json[0]["constraints"] || "";
      let code_language = questionObj["code_language"];
      

      let description = "";

      let problem_prompt = prompt.replace("{{problem_text}}", problem_text);
      problem_prompt = problem_prompt.replace("{{input_format}}", input_format);
      problem_prompt = problem_prompt.replace("{{output_format}}", output_format);
      problem_prompt = problem_prompt.replace("{{constraints}}", constraints);
      problem_prompt = problem_prompt.replace("{{code_language}}", code_language);

      remark().process(problem_prompt, (err, file) => {
        if (err) throw err;
        description = String(file);
      });

      questionObj.prompt = problem_prompt;
      delete questionObj.prompt_response;
      questionObj.problem_text = problem_text;
      questionObj.short_text = short_text;
      questionObj.input_format = input_format;
      questionObj.output_format = output_format;
      questionObj.constraints = constraints;
    });

    const updatedJsonData = JSON.stringify(questions_data_json, null, 2);

    fs.writeFile(prompt_testcase_json_file_path, updatedJsonData, "utf8", (err) => {
      if (err) {
        console.error("Error writing file:", err);
        return;
      }

      console.log("Questions With Prompts JSON file updated successfully");
    });
  });
});
