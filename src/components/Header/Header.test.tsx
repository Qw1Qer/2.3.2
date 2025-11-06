import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'
import Header from './Header'


describe('Header', () => {
    it('renders logo', () => {
        render(<Header />)
        expect(screen.getByAltText('logo')).toBeInTheDocument()
    })

    it('renders cart button with text', () => {
        render(<Header />)
        expect(screen.getByText('Cart')).toBeInTheDocument()
    })

    it('calls onOpenCart when cart button is clicked', async () => {
        const user = userEvent.setup()
        const mockOnOpenCart = vi.fn()

        render(<Header onOpenCart={mockOnOpenCart} />)

        // Ищем кнопку по тексту "Cart"
        await user.click(screen.getByText('Cart'))

        expect(mockOnOpenCart).toHaveBeenCalledTimes(1)
    })

    it('renders cart icon', () => {
        render(<Header />)
        expect(screen.getByAltText('cart')).toBeInTheDocument()
    })

    it('works without onOpenCart callback', async () => {
        const user = userEvent.setup()

        render(<Header />)

        // Не должно быть ошибок при клике без callback
        await user.click(screen.getByText('Cart'))

        expect(screen.getByAltText('logo')).toBeInTheDocument()
    })
})