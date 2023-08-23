Hey GPT, assume that you are working as a problem setter for a company in which you have to design Coding Questions for their online coding platforms. So for that I will give you a sample question with sample input and output along with it's explanation and also I will provide you few test cases that work for the problem.

Things you have to do:
1) You have to paraphrase the given problem and if there are any variables present in the problem, then change those variable names.
2) You can also change the numerical values (if any present)
3) You have to generate 10 new test cases.
4) You have to take the first test case as a sample input and output and generate the appropriate explanation for that.
5) Make sure constraints that I have given you should strictly match for the generated problem also.
6) You also have to generate me the {{code_language}} code solution for this problem at the "code_data" field in the JSON.
7) You have to give me the generated problem in a JSON format provide below.

JSON Format:

```json
[
{
"problem_text": "Problem Text Here",
"sample_input": "Sample Input Here",
"sample_output": "Sample Output Here",
"explanation": "Explanation Here",
"code_data": "{{code_language}} Solution Code Here",
"constraints": "Constraints Here",
"test_cases": {
    "test_case_1": "Input & Output of Test Case-1 Here",
    "test_caes_2": "Input & Output of Test Case-2 Here",
    "test_caes_3": "Input & Output of Test Case-3 Here",
    .
    .
    .
    "test_case_10": "Input & Output of Test Case-10 Here"
}
}
]
```

Problem: "{{problem_text}}"

Sample Input: {{sample_input}}
Sample Output: {{sample_output}}
Explanation: {{explanation}}
Constraints: {{constraints}}

Instructions:
- While generating sample input/output and test cases, make sure that the output is the correct result for the input provided in the context of that problem.
- {{code_language}} code solution must be present at the "code_data" field in the JSON mandatorily, otherwise I will bang you on your face.
- Give the generated results in the prescribed JSON format only.

Example JSON:

```json
[
{
"problem_text": "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.\nYou may assume that each input would have exactly one solution, and you may not use the same element twice.\nYou can return the answer in any order.",
"sample_input": "2,7,9,15\n9",
"sample_output": "[0,1]",
"explanation": "Because nums[0] + nums[1] == 9, we return [0, 1].",
"code_data": "def twoSum(nums, target):\n        n = len(nums)\n        for i in range(n):\n            x = target - nums[i]\n            if x in nums and nums.index(x) != i:\n                return [i, nums.index(x)]\n\n    nums = list(map(int, input().split(\",\")))\n    target = int(input())\n     result = twoSum(nums, target)\n    print(result)",
"constraints": "- 2 <= nums.length <= 10^4\n- -10^9 <= nums[i] <= 10^9\n- -10^9 <= target <= 10^9\n- Only one valid answer exists.",
"test_cases": {
    "test_case_1": {
"Input": "1,3,7,9,2\\n11",
"Output": "[2,4]"
},   
"test_case_2": {
"Input": "10,20,30,40,50\\n90",
"Output": "[3,4]"
},
"test_case_3": {
    "Input": "5,10,15,20,25\\n35",
    "Output": "[2,3]"
    },
"test_case_4": {
    "Input": "2,4,6,8,10\\n12",
    "Output": "[2,3]"
    },   
"test_case_5": {
    "Input": "1,2,3,4,5\\n9",
    "Output": "[3,4]"
    },    
"test_case_6": {
    "Input": "10,20,30,40,50\\n60",
    "Output": "[1,2]"
    },
"test_case_7": {
    "Input": "5,10,15,20,25\\n30",
    "Output": "[1,3]"
    },
"test_case_8": {
    "Input": "2,4,6,8,10\\n14",
    "Output": "[3,4]"
    },
"test_case_9": {
    "Input": "1,2,3,4,5\\n7",
    "Output": "[2,4]"
    },    
"test_case_10": {
    "Input": "10,20,30,40,50\\n70",
    "Output": "[2,3]"
    }
}
}
]
```

Make sure all the result properly wrapped as per the instructed JSON format. If you didn't follow any of my instructions properly, then I will fire you from the job. 