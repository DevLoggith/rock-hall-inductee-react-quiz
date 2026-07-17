import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from "vitest";

import App from './App';

const { mockQuestion } = vi.hoisted(() => {
    return {
        mockQuestion: {
            inductee: { name: "Test Artist A", inductionYear: 1988, priorNominations: [1987], inductionPresenter: "Little Richard" },
            answers: [1992, 2006, 1988, 1997],
            correctAnswer: 1988
        }
    };
});

vi.mock("./utils/generateQuestion", () => ({
    generateQuestion: vi.fn(() => mockQuestion)
}));

describe("QuestionCard", () => {
    it("renders the correct answer as correct", async () => {
        render(<App />);

        const user = userEvent.setup();
        const correctButton = screen.getByText("1988");

        await user.click(correctButton);

        const heading = screen.getByRole("heading", { level: 2 });
        const headingSpan = within(heading).getByText("That's correct!")
        

        expect(headingSpan).toBeInTheDocument();
        expect(correctButton).toHaveClass("correct");
    });
});
