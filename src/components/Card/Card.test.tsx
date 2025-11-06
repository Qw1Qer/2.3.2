import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'
import Card from './Card'

vi.mock('../Button/Button.tsx', () => ({
    default: vi.fn(({ text, onClick }) => (
        <button onClick={onClick} data-testid="mock-button">
            {text}
        </button>
    ))
}))

vi.mock('../ProductCounter/ProductCounter.tsx', () => ({
    default: vi.fn(({ count, onCountChange, itCard }) => (
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
                disabled={itCard && count <= 1}
            >
                -
            </button>
        </div>
    ))
}))

describe('Card', () => {
    const mockProduct = {
        id: 1,
        name: 'Test Product',
        price: '19.99',
        image: '/test-image.jpg'
    }

    it('renders product information correctly', () => {
        render(
            <Card
                prodImg={mockProduct.image}
                prodName={mockProduct.name}
                prodPrice={mockProduct.price}
                product={mockProduct}
            />
        )

        expect(screen.getByAltText(mockProduct.name)).toBeInTheDocument()
        expect(screen.getByText(mockProduct.name)).toBeInTheDocument()
        expect(screen.getByText(`$ ${mockProduct.price}`)).toBeInTheDocument()
    })

    it('renders loader when forLoading is true', () => {
        render(<Card forLoading={true} />)

        expect(screen.getByAltText('Loading...')).toBeInTheDocument()
        expect(screen.queryByTestId('mock-product-counter')).not.toBeInTheDocument()
        expect(screen.queryByTestId('mock-button')).not.toBeInTheDocument()
        expect(screen.queryByText(/\$/)).not.toBeInTheDocument()
    })

    it('does not render interactive elements when forLoading is true', () => {
        render(
            <Card
                forLoading={true}
                prodName="Test Product"
                prodPrice="19.99"
            />
        )

        expect(screen.queryByText('Test Product')).not.toBeInTheDocument()
        expect(screen.queryByText('$ 19.99')).not.toBeInTheDocument()
        expect(screen.queryByTestId('mock-button')).not.toBeInTheDocument()
    })

    it('calls onCart with correct data when add to cart is clicked', async () => {
        const user = userEvent.setup()
        const mockOnCart = vi.fn()

        render(
            <Card
                product={mockProduct}
                onCart={mockOnCart}
            />
        )

        await user.click(screen.getByTestId('mock-button'))

        expect(mockOnCart).toHaveBeenCalledWith({
            id: mockProduct.id,
            name: mockProduct.name,
            price: mockProduct.price,
            image: mockProduct.image,
            quantity: 1
        })
    })



    it('does not call onCart when product is not provided', async () => {
        const user = userEvent.setup()
        const mockOnCart = vi.fn()

        render(<Card onCart={mockOnCart} />)

        await user.click(screen.getByTestId('mock-button'))

        expect(mockOnCart).not.toHaveBeenCalled()
    })

    it('updates quantity when ProductCounter changes', async () => {
        const user = userEvent.setup()
        const mockOnCart = vi.fn()

        render(
            <Card
                product={mockProduct}
                onCart={mockOnCart}
            />
        )

        // Увеличиваем счетчик два раза
        await user.click(screen.getByTestId('increment-button'))
        await user.click(screen.getByTestId('increment-button'))

        // Нажимаем "Add to cart"
        await user.click(screen.getByTestId('mock-button'))

        expect(mockOnCart).toHaveBeenCalledWith(
            expect.objectContaining({
                quantity: 3 // начальное 1 + 2 клика = 3
            })
        )
    })

    it('renders ProductCounter with correct props', () => {
        render(<Card product={mockProduct} />)

        const counterValue = screen.getByTestId('counter-value')
        expect(counterValue).toHaveTextContent('1') // начальное значение
    })

    it('handles missing product props gracefully', () => {
        render(<Card prodName="Standalone Product" prodPrice="9.99" />)

        expect(screen.getByText('Standalone Product')).toBeInTheDocument()
        expect(screen.getByText('$ 9.99')).toBeInTheDocument()
        expect(screen.getByTestId('mock-button')).toBeInTheDocument()
    })

})