import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'
import Button from './Button'

describe('Button', () => {
    it('renders with text', () => {
        render(<Button text="Click me" />)
        expect(screen.getByText('Click me')).toBeInTheDocument()
    })

    it('calls onClick when clicked', async () => {
        const user = userEvent.setup()
        const handleClick = vi.fn()

        render(<Button text="Click me" onClick={handleClick} />)
        await user.click(screen.getByText('Click me'))

        expect(handleClick).toHaveBeenCalledTimes(1)
    })


    it('shows count from cards when cards provided', () => {
        const mockCards = [{ id: 1 }, { id: 2 }, { id: 3 }]
        render(<Button text="Cart" cards={mockCards} />)
        expect(screen.getByText('3')).toBeInTheDocument()
    })

    // Тестируем классы без зависимости от hover
    it('applies unhoverClass', () => {
        render(<Button text="Button" unhoverClass="default-class" />)
        const button = screen.getByText('Button')
        expect(button).toHaveClass('default-class')
    })
})