import styles from './Textarea.scoped.scss';
import { useEffect, useRef, useState } from 'react';

function Textarea({ column, onChange, onBlur }) {
  const textareaRef = useRef(null);

  // The value of the textarea
  const [value, setValue] = useState();

  // This function is triggered when textarea changes
  const textAreaChange = (event) => {
    setValue(event.target.value);
  };

  useEffect(() => {
    if (textareaRef && textareaRef.current) {
      textareaRef.current.style.height = '0px';
      const scrollHeight = textareaRef.current.scrollHeight;
      textareaRef.current.style.height = scrollHeight + 'px';
    }
  }, [value]);

  return (
    <div style={styles.container}>
      <textarea
        ref={textareaRef}
        style={styles.textarea}
        onChange={textAreaChange}
      >
        {value}
      </textarea>
    </div>
  );
}

export default Textarea;
