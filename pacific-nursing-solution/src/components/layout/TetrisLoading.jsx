import "./tetrisLoading.css";

const TetrisLoading = () => {
  return (
    <div className="tetris-loader" aria-busy="true" aria-live="polite">
      <div className="tetris-container">
        <div className="block block1"></div>
        <div className="block block2"></div>
        <div className="block block3"></div>
        <div className="block block4"></div>
        <div className="block block5"></div>
        <div className="block block6"></div>
        <div className="block block7"></div>
        <div className="block block8"></div>
      </div>
    </div>
  );
};

export default TetrisLoading;
