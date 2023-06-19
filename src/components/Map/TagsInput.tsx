import React from "react";
import { useState } from "react";

interface TagsInputProps {
  onTagsChange: (tags: string[]) => void;
}

const TagsInput: React.FC<TagsInputProps> = ({ onTagsChange }) => {
  const [tags, setTags] = useState<string[]>([]);
  const [input, setInput] = useState("");

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== "Enter") return;
    e.preventDefault();
    const value = e.currentTarget.value.trim();
    if (!value) return;

    setTags((prevTags) => {
      const newTags = [...prevTags, value];
      if (newTags.length > 5) {
        newTags.shift();
      }
      onTagsChange(newTags);
      return newTags;
    });
    setInput("");
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  return (
    <div className="tags-input-container">
      {tags.map((tag, index) => (
        <div className="tag-item" key={index}>
          <span className="text">{tag}</span>
        </div>
      ))}
      <input
        type="text"
        className="tags-input"
        placeholder="e.g. cafe, peaceful"
        id="tags-input"
        value={input}
        onKeyDown={handleKeyDown}
        onChange={handleInputChange}
      />
    </div>
  );
};

export default TagsInput;
