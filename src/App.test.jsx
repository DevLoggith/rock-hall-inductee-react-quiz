import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import App from "./App";

const { mockQuestion } = vi.hoisted(() => {
	return {
		mockQuestion: {
			inductee: {
				name: "Test Artist A",
				inductionYear: 1988,
				priorNominations: [1987],
				inductionPresenter: "Little Richard",
			},
			answers: [1992, 2006, 1988, 1997],
			correctAnswer: 1988,
		},
	};
});

vi.mock("./utils/generateQuestion", () => ({
	generateQuestion: vi.fn(() => mockQuestion),
}));

// helper for "displays final score" test
async function answerAndAdvance(user, buttonText) {
	const button = screen.getByText(buttonText);
	await user.click(button);
	await user.click(screen.getByText("Next Question"));
}

describe("App", () => {
	it("renders the correct answer as correct", async () => {
		render(<App />);

		const user = userEvent.setup();
		const correctButton = screen.getByText("1988");

		await user.click(correctButton);

		const heading = screen.getByRole("heading", { level: 2 });

		expect(heading).toHaveTextContent("That's correct!");
		expect(correctButton).toHaveClass("correct");
	});

	it("renders the incorrect answer as incorrect", async () => {
		render(<App />);

		const user = userEvent.setup();
		const incorrectButton = screen.getByText("2006");

		await user.click(incorrectButton);

		const heading = screen.getByRole("heading", { level: 2 });

		expect(heading).toHaveTextContent("Sorry, that's incorrect");
		expect(incorrectButton).toHaveClass("incorrect");
	});

	it("resets question state", async () => {
		render(<App />);

		const user = userEvent.setup();
		const answerButton = screen.getByText("1997");

		await user.click(answerButton);

		const nextButton = screen.getByText("Next Question");

		await user.click(nextButton);
		const answerButtons = screen.getAllByRole("button");

		expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent(
			/What year was.*inducted into the Rock & Roll Hall of Fame\?/,
		);
		answerButtons.forEach((button) => {
			expect(button).not.toHaveClass("correct");
			expect(button).not.toHaveClass("incorrect");
		});
	});

	it("displays the final score", async () => {
		render(<App />);

		const user = userEvent.setup();

		// TODO: refactor to a 'while' loop w/queryByText instead of hard coded # of iterations
		for (let i = 1; i < 5; i++) { await answerAndAdvance(user, "1992") }
		await user.click(screen.getByText("1992"));

		expect(screen.getByText("View Score")).toBeInTheDocument();

		await user.click(screen.getByText("View Score"));

		expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent(
			/You got.*questions right/,
		);
	});
});
