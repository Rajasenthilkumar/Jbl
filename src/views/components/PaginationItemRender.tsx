export const PaginationItemRender = (
  _: number,
  type: 'page' | 'prev' | 'next' | 'jump-prev' | 'jump-next',
  element: React.ReactNode,
) => {
  if (type === 'prev') {
    return (
      <div className="flex items-center justify-center h-full">
        {' '}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="39"
          height="39"
          viewBox="0 0 39 39"
          fill="none"
        >
          <path d="M1.66895 19.4887L8.55245 26.3949L10.8534 24.1004L7.89432 21.1316L37.3328 21.1283V17.8783L7.88782 17.8816L10.8697 14.9078L8.5752 12.6068L1.66895 19.4887Z" />
        </svg>
      </div>
    );
  }
  if (type === 'next') {
    return (
      <div className="flex items-center justify-center h-full">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="39"
          height="39"
          viewBox="0 0 39 39"
          fill="none"
        >
          <path d="M37.3311 19.4887L30.4476 26.3949L28.1466 24.1004L31.1057 21.1316L1.66718 21.1283V17.8783L31.1122 17.8816L28.1303 14.9078L30.4248 12.6068L37.3311 19.4887Z" />
        </svg>
      </div>
    );
  }
  return element;
};
