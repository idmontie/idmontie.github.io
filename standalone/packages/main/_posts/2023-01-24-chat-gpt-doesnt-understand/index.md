---
title: ChatGPT Doesn't Understand
tags: ["openai", "chatgpt"]
---

Looks like everyone is trying to discover ChatGPT’s limitations. In one article I read, the author asked whether [ChatGPT can play 20 questions](https://medium.com/@theworldaccordingtocgpt/chatgpt-can-play-20-questions-7911405f7aff). The human in this scenario tried to play 20 questions with ChatGPT, and found that they needed to guide the AI to ask questions. From my perspective, it looked more like a failure to engineer the initial prompt correctly.

I attempted to do 20 questions with ChatGPT using a different prompt:

*Me: I would like to play a game. It's called twenty questions. You will ask me one question at a time and I will answer it. The goal is for you guess the thing I am thinking about.*

*ChatGPT: Sure, I'd be happy to play "Twenty Questions" with you. Please go ahead and think of something, and I will start asking my first question.*

*Me: I am ready*

*ChatGPT: Great, here is my first question: Is the thing you are thinking of an object?*

*Me: Yes*

*ChatGPT: Is the object something that you can hold in your hand?*

*Me: Yes*

*ChatGPT: Is the object something that you would typically find in a kitchen?*

*Me: No*

*ChatGPT: Is the object something that you would use for transportation?*

*Me: No*

*ChatGPT: Is the object something that you would use for entertainment or leisure?*

*Me: Yes*

*ChatGPT: Is the object a musical instrument?*

*Me: No*

*ChatGPT: Is the object a type of game or puzzle?*

*Me: No*

*ChatGPT: Is the object a piece of technology such as a phone or computer?*

*Me: No*

*ChatGPT: Is the object a book or magazine?*

*Me: Yes*

*ChatGPT: Is the object a novel or a collection of short stories?*

*Me: Yes*

*ChatGPT: Is the object a specific book that is widely known and read?*

*Me: Yes*

*ChatGPT: Is the object "To Kill a Mockingbird" by Harper Lee?*

*Me: No*

*ChatGPT: I'm sorry, I'm running out of ideas. Can you give me a hint or tell me the answer?*

Seems like we hit a wall here with twenty questions, but ChatGPT is very close, so I decided to give a hint.

*Me: You are on the right track. It is by Walt Whitman*

*ChatGPT: Is the object "Leaves of Grass" by Walt Whitman?*

*Me: Yes! Congratulations!*

*ChatGPT: Thank you! I'm glad I was able to guess the object you were thinking of. It was fun playing "Twenty Questions" with you. Let me know if you want to play again sometime.*

---

I’ve been keeping an eye on how other people are using ChatGPT, and [prompt engineering](https://en.wikipedia.org/wiki/Prompt_engineering) is one of the more fascinating aspects around how people are communicating with the AI. Prompt engineering plays a key role in communicating with models like ChatGPT. Carefully crafting prompts can help maximize the quality of the reponse. However, it is important to keep in mind that, like any AI model, ChatGPT has its own set of limitations.

So I was curious when I read that “[ChatGPT can’t write sentences that end in a specific letter](https://www.reddit.com/r/ChatGPT/comments/101e454/chatgpt_cant_write_sentences_that_end_with_a/)”. Is this a real limitation of ChatGPT, or maybe this was just a poor prompt.

So let’s start with a very simple question to ChatGPT:

*Me: Can you write a sentence that ends with the letter "a"?*

*ChatGPT: The cat sat on the mat.*

*Me: That sentence does not end in the letter "a". Can you write a sentence that ends in the letter "a"?*

*ChatGPT: I can't think of anything right now, but the word "America" ends with letter "a".*

*Me: Great, write a sentence that ends in that word. That will then satisfy the original question.*

*ChatGPT: The land of the free, and the home of the brave, America.*

Okay, that does technically end in the letter a, but the sentence seems very strange.

*Me: That isn't a very coherent sentence. Can you write a sentence that ends in the letter "a"?*

*ChatGPT: I am sorry for the confusion, here is a sentence that ends with the letter "a" - "He saw the drama unfold on the stage, it was quite the spectacle, a.”*

Looks like we are going off the rails here. Let’s try a different approach:

*Me: Write a sentence that ends in a word that ends with the letter "a".*

*ChatGPT: The sun was setting over the horizon, painting the sky with shades of orange and red, a spectacle to behold and end the day with.*

I’m going to ask ChatGPT to tell me a prompt to feed back to itself. I’ve found this useful for resetting context when having long conversations. Or if ChatGPT gets into weird states like the above response.

*Me: Can you tell me how to write a prompt for you that would actually get you to write a sentence that ends in the letter "a".*

*ChatGPT: Sure, to get me to write a sentence that ends in the letter "a" you could provide a prompt like: "Write a sentence that ends with a word that ends with the letter 'a'" or "Can you write a sentence with a word ending in 'a' at the end of the sentence?" . This makes it clear that the sentence should end in a word ending with the letter 'a'.*

*Me: Can you write a sentence with a word ending in 'a' at the end of the sentence?*

*ChatGPT: The sky was clear and blue, not a cloud in sight, perfect for a day out at the parka.*

---

While ChatGPT is great at forming sentences and even code, it seems like it has no understanding and hasn’t been trained on letters, syllables, or the concept of sentences. I've seen others get ChatGPT to create poems, but it has no concept of why words would rhyme. It can give great answers to questions, but doesn’t understand how to count how many words are in its response.

One Redditor in the link above mentions that ChatGPT fails at ASCII art. I’ve tried getting the AI to print ASCII art before, and I’ll leave you with part of a conversation I’ve had with it. This appears to be the best ASCII art I could get it to print, even after having a long conversation where I provided different ASCII art examples:

*Me: Can you make ASCII art? Show me a picture of a cat.*

*ChatGPT: Sure! Here is a picture of a cat using ASCII art:*

```
 /\_/\
( o.o )
 >^<

```

*I hope you like it! Is there anything else I can help with?*

*Me: Can you make it more detailed*

*ChatGPT: Certainly! Here is a more detailed version of an ASCII art cat:*

```
 /\_/\
( o.o )
  >^<
  | |
  || ||
  \\ //
  // \\
  \\_//
  /   \
 /     \

```

With new language models coming out, it's important to recognize what the limitations
of the AI are. Poor responses can be a result of poorly written prompts, but there
are times, like with letters in words with ChatGPT, where the AI just doesn't have
the capability to understand the question.
