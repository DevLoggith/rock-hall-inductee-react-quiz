import { describe, it, expect } from 'vitest';
import { generateQuestion } from './generateQuestion';

const mockInductees = [
    {name: 'Test Artist A', inductionYear: 2000, priorNominations: [], inductionPresenter: null},
    {name: 'Test Artist B', inductionYear: 2001, priorNominations: [], inductionPresenter: 'Induction Presenter B'},
    {name: 'Test Artist C', inductionYear: 2002, priorNominations: [2000], inductionPresenter: null},
    {name: 'Test Artist D', inductionYear: 2003, priorNominations: [2000, 2001], inductionPresenter: 'Induction Presenter D'}
];

describe('generateQuestion', () => {
    it('returns a question with the expected shape', () => {
        const question = generateQuestion(mockInductees, [])

        expect(question).toHaveProperty('inductee');
        expect(question).toHaveProperty('answers');
        expect(question).toHaveProperty('correctAnswer');
    });

    it('generates a unique question each time', () => {
        const prevQuestions = ['Test Artist A', 'Test Artist D'];
        const question = generateQuestion(mockInductees, prevQuestions);

        expect(prevQuestions).not.toContain(question.inductee.name);
    });

    it('generates four unique answer values', () => {
        const question = generateQuestion(mockInductees, []);
        const answers = question.answers
        const isUnique = new Set(answers).size === answers.length

        expect(isUnique).toBe(true);
    });

    it('includes the correct answer as one of the choices', () => {
        const question = generateQuestion(mockInductees, []);

        expect(question.answers).toContain(question.correctAnswer);
    });
});