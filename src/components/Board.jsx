import PropTypes from 'prop-types';

const Board = ({ title }) => {
    return (
        <div>
            <h2>{title}</h2>
            <p>여기에 게시판 내용이 들어갑니다.</p>
        </div>
    );
};

Board.propTypes = {
    title: PropTypes.string.isRequired,
};

export default Board;
