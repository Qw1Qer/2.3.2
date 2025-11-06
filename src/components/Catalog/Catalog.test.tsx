import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import Catalog from './Catalog'

// Простой мок без внешних переменных
vi.mock('../Card/Card.tsx', () => ({
    default: ({ prodName, forLoading }: any) => (
        <div data-testid="mock-card">
            {forLoading ? 'Loading Card...' : prodName || 'Card'}
        </div>
    )
}))

describe('Catalog', () => {
    const mockProducts = [
        { id: 1, name: 'Product 1', price: '19.99', image: '/image1.jpg' },
        { id: 2, name: 'Product 2', price: '29.99', image: '/image2.jpg' },
    ]

    it('renders catalog title', () => {
        render(<Catalog products={mockProducts} />)
        expect(screen.getByText('Catalog')).toBeInTheDocument()
    })

    it('renders products list', () => {
        render(<Catalog products={mockProducts} />)
        expect(screen.getAllByTestId('mock-card')).toHaveLength(2)
    })

    it('renders loading state with 8 skeletons', () => {
        render(<Catalog loading={true} />)
        expect(screen.getAllByTestId('mock-card')).toHaveLength(8)
        expect(screen.getAllByText('Loading Card...')).toHaveLength(8)
    })

    it('shows empty state when no products', () => {
        render(<Catalog products={[]} />)
        expect(screen.queryAllByTestId('mock-card')).toHaveLength(0)
    })

    it('throws error when error provided', () => {
        expect(() => render(<Catalog error="API Error" />)).toThrow('API Error')
    })
})