import './DefaultLayout.scss';

function DefaultLayout({ children }) {
  return (
    <div className='board-layout'>
      <main className='main'>{children}</main>
    </div>
  );
}

export default DefaultLayout;
