// import { describe, it, expect, vi } from 'vitest'
// import { render, screen, fireEvent } from '@testing-library/react'
// import Button from '../Button'

// // Mock do CSS Modules
// vi.mock('./styles.module.css', () => ({
//   default: {
//     button: 'button-base',
//     primary: 'primary-class',
//     secondary: 'secondary-class',
//     terciary: 'terciary-class',
//     quaternary: 'quaternary-class',
//     danger: 'danger-class',
//     transparent: 'transparent-class',
//     link: 'link-class',
//     gap: 'gap-class',
//   }
// }))

// describe('Componente Button', () => {
//   it('renderiza o botão com children', () => {
//     render(<Button>Texto do Botão</Button>)
//     expect(screen.getByRole('button').textContent).toBe('Texto do Botão')
//   })

//   it('aplica a classe base', () => {
//     render(<Button>Teste</Button>)
//     const button = screen.getByRole('button')
//     expect(button.className.includes('button-base')).toBe(true)
//   })

//   const variants = [
//     { prop: 'primary', className: 'primary-class' },
//     { prop: 'secondary', className: 'secondary-class' },
//     { prop: 'terciary', className: 'terciary-class' },
//     { prop: 'quaternary', className: 'quaternary-class' },
//     { prop: 'danger', className: 'danger-class' },
//     { prop: 'transparent', className: 'transparent-class' },
//     { prop: 'link', className: 'link-class' },
//     { prop: 'gap', className: 'gap-class' },
//   ]

//   variants.forEach(({ prop, className }) => {
//     it(`aplica a classe ${className} para a prop ${prop}`, () => {
//       render(<Button {...{ [prop]: true }}>Teste</Button>)
//       const button = screen.getByRole('button')
//       expect(button.className.includes(className)).toBe(true)
//     })
//   })

//   it('combina múltiplas classes', () => {
//     render(<Button primary danger>Teste</Button>)
//     const button = screen.getByRole('button')
//     expect(button.className).toMatch(/primary-class/)
//     expect(button.className).toMatch(/danger-class/)
//   })

//   it('passa atributos nativos corretamente', () => {
//     const mockClick = vi.fn()
//     render(
//       <Button 
//         disabled 
//         type="submit"
//         onClick={mockClick}
//       >
//         Teste
//       </Button>
//     )

//     const button = screen.getByRole('button') as HTMLButtonElement
    
//     // Verifica atributos
//     expect(button.type).toBe('submit')
//     expect(button.disabled).toBe(true)
    
//     // Verifica evento click
//     fireEvent.click(button)
//     expect(mockClick).toHaveBeenCalled()
//   })
// })