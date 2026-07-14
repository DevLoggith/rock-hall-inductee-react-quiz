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
});