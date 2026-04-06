function AnswerButton({ value, onAnswerSelect, className, disabled }) {
	return (
		<button
			className={`answer-button ${className}`}
			onClick={onAnswerSelect}
			disabled={disabled}
		>
			{value}
		</button>
	);
}

export default AnswerButton;
