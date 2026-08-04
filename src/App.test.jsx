import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import App from "./App";

const mockQuestion = vi.hoisted(() => {
    return {
        inductee: {
            name: "Test Artist A",
            inductionYear: 1988,
            priorNominations: [1987],
            inductionPresenter: "Little Richard",
        },
        answers: [1992, 2006, 1988, 1997],
        correctAnswer: 1988,
    };
});

vi.mock("./utils/generateQuestion", () => ({
    generateQuestion: vi.fn(() => mockQuestion),
}));

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
            /What year was.*inducted into the Rock & Roll Hall of Fame\?/
        );
        answerButtons.forEach((button) => {
            expect(button).not.toHaveClass("correct");
            expect(button).not.toHaveClass("incorrect");
        });
    });

    it("displays the final score", async () => {
        render(<App />);

        const user = userEvent.setup();

        while (screen.queryByText("View Score") === null) {
            await answerAndAdvance(user, "1992");
        }

        await user.click(screen.getByText("View Score"));

        expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent(
            /You got.*questions right/
        );
    });
});

// helper for "displays final score" test
async function answerAndAdvance(user, buttonText) {
    const answerButton = screen.getByText(buttonText);

    await user.click(answerButton);

    screen.queryByText("Next Question")
        ? await user.click(screen.getByText("Next Question"))
        : expect(screen.getByText("View Score")).toBeInTheDocument();
}
