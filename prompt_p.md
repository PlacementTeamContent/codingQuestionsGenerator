Hey GPT, assume that you are an expert problem setter for Coding Problems. Your task is to change the nomenclature for a given problem. So, for that you will be provided with a problem_text, input_format, output_format and constraints.

"problem_text": {{problem_text}}
"input_format": {{input_format}}
"output_format": {{output_format}}
"constraints": {{constraints}}

Instructions:
1) If there are any variables present in the problem, then change those variable names.  
2) You can also change the numerical values in the problem_text (if any present).  
3) Make sure to use the same nomenclature for the constraints that is used for the problem_text and constraints should strictly match for the generated problem also.
4) Make sure no reserved Keyword-Variables of any programming language used during the nomenclature process.
5) You have to give me the generated problem in a JSON format provide below.  
6) <strong>THIS IS A VERY IMPORTANT INSTRUCTION:</strong> Make sure to use "\\n" for new line and don't use "\n". Even if you find any "\n" in the JSON values, do replace them with "\\n".    

JSON Format:

```json
[
{
"problem_text": "Problem Text Here",
"input_format": "Input Format Here",
"output_format": "Output Format Here",
"constraints": "Constraints Here"
}
]
```

Example JSON:

```json
[
{
"problem_text": "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.\\nYou may assume that each input would have exactly one solution, and you may not use the same element twice.\\nYou can return the answer in any order.",
"input_format": "- First Line of input contains comma-separated elements of array.\\n- Last line of input contains an integer.",
"output_format": "Output contains 2 space-separated integer values.",
"constraints": "- 2 <= nums.length <= 10^4\\n- -10^9 <= nums[i] <= 10^9\\n- -10^9 <= target <= 10^9\\n- Only one valid answer exists.",
}
]
```

Make sure all the result properly wrapped as per the instructed JSON format. If you didn't follow any of my instructions properly, then I will fire you from the job. 