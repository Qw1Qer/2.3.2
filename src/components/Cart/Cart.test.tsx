import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'
import Cart from './Cart'

// Мокаем ProductCounter
vi.mock('../ProductCounter/ProductCounter.tsx', () => ({
    default: vi.fn(({ count, onCountChange }) => (
        <div data-testid="mock-product-counter">
            <span data-testid="counter-value">{count}</span>
            <button
                onClick={() => onCountChange?.(count + 1)}
                data-testid="increment-button"
            >
                +
            </button>
            <button
                onClick={() => onCountChange?.(count - 1)}
                data-testid="decrement-button"
            >
                -
            </button>
        </div>
    ))
}))

describe('Cart', () => {
    const mockCards = [
        {
            id: 1,
            name: 'Product-One',
            price: '19.99',
            image: '/image1.jpg',
            quantity: 2
        },
        {
            id: 2,
            name: 'Product-Two',
            price: '29.99',
            image: '/image2.jpg',
            quantity: 1
        }
    ]

    it('does not render when forOpen is false', () => {
        render(<Cart forOpen={false} cards={mockCards} />)

        expect(screen.queryByText('Total:')).not.toBeInTheDocument()
        expect(screen.queryByTestId('mock-product-counter')).not.toBeInTheDocument()
    })

    it('renders empty state when no cards', () => {
        render(<Cart forOpen={true} cards={[]} />)

        expect(screen.getByAltText('cart')).toBeInTheDocument()
        expect(screen.getByText('Your cart is empty!')).toBeInTheDocument()
        expect(screen.queryByText('Total:')).not.toBeInTheDocument()
    })


    it('renders product counters for each item', () => {
        render(<Cart forOpen={true} cards={mockCards} />)

        const counters = screen.getAllByTestId('mock-product-counter')
        expect(counters).toHaveLength(2)

        const counterValues = screen.getAllByTestId('counter-value')
        expect(counterValues[0]).toHaveTextContent('2')
        expect(counterValues[1]).toHaveTextContent('1')
    })

    it('calculates total amount correctly', () => {
        render(<Cart forOpen={true} cards={mockCards} />)

        expect(screen.getByText('$69.97')).toBeInTheDocument()
    })

    it('calls onUpdateQuantity when incrementing item', async () => {
        const user = userEvent.setup()
        const mockOnUpdateQuantity = vi.fn()

        render(<Cart forOpen={true} cards={mockCards} onUpdateQuantity={mockOnUpdateQuantity} />)

        const incrementButtons = screen.getAllByTestId('increment-button')
        await user.click(incrementButtons[0]) // Увеличиваем первый товар

        expect(mockOnUpdateQuantity).toHaveBeenCalledWith(1, 3) // id: 1, quantity: 2 + 1 = 3
    })

    it('calls onUpdateQuantity when decrementing item', async () => {
        const user = userEvent.setup()
        const mockOnUpdateQuantity = vi.fn()

        render(<Cart forOpen={true} cards={mockCards} onUpdateQuantity={mockOnUpdateQuantity} />)

        const decrementButtons = screen.getAllByTestId('decrement-button')
        await user.click(decrementButtons[0]) // Уменьшаем первый товар

        expect(mockOnUpdateQuantity).toHaveBeenCalledWith(1, 1) // id: 1, quantity: 2 - 1 = 1
    })

    it('calls onUpdateQuantity with 0 when quantity becomes 0', async () => {
        const user = userEvent.setup()
        const mockOnUpdateQuantity = vi.fn()
        const singleItemCard = [{ ...mockCards[1], quantity: 1 }] // Товар с quantity: 1

        render(<Cart forOpen={true} cards={singleItemCard} onUpdateQuantity={mockOnUpdateQuantity} />)

        const decrementButtons = screen.getAllByTestId('decrement-button')
        await user.click(decrementButtons[0]) // Уменьшаем до 0

        expect(mockOnUpdateQuantity).toHaveBeenCalledWith(2, 0) // id: 2, quantity: 0
    })

    it('handles undefined cards gracefully', () => {
        render(<Cart forOpen={true} cards={undefined} />)

        expect(screen.getByText('Your cart is empty!')).toBeInTheDocument()
    })



    it('renders product images with correct alt text', () => {
        render(<Cart forOpen={true} cards={mockCards} />)

        const images = screen.getAllByAltText('Product-One')
        expect(images[0]).toHaveAttribute('src', '/image1.jpg')

        const images2 = screen.getAllByAltText('Product-Two')
        expect(images2[0]).toHaveAttribute('src', '/image2.jpg')
    })
})