import './Input.scoped.scss';

function Input({ column, onChange }) {
  return (
    <div className='input'>
      <input type='text' value={column} onChange={onChange} />
    </div>
  );
}

export default Input;
