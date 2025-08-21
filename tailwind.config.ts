import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '1.5rem',
			screens: {
				'sm': '640px',
				'md': '768px',
				'lg': '1024px',
				'xl': '1280px',
				'2xl': '1400px'
			}
		},
		extend: {
			fontFamily: {
				'sans': ['Inter', 'system-ui', 'sans-serif'],
			},
			colors: {
				// UniFlow Brand Colors
				'uni-red': {
					DEFAULT: 'hsl(var(--uni-red))',
					hover: 'hsl(var(--uni-red-hover))'
				},
				'flow-blue': {
					DEFAULT: 'hsl(var(--flow-blue))',
					light: 'hsl(var(--flow-blue-light))',
					dark: 'hsl(var(--flow-blue-dark))'
				},

				// Base Colors
				border: 'hsl(var(--card-border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: {
					DEFAULT: 'hsl(var(--background))',
					soft: 'hsl(var(--background-soft))',
					muted: 'hsl(var(--background-muted))'
				},
				foreground: 'hsl(var(--foreground))',

				// Component Colors
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				success: {
					DEFAULT: 'hsl(var(--success))',
					foreground: 'hsl(var(--success-foreground))'
				},
				warning: {
					DEFAULT: 'hsl(var(--warning))',
					foreground: 'hsl(var(--warning-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--background-muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--background-soft))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))',
					border: 'hsl(var(--card-border))'
				},

				// Form Colors
				'input-border': 'hsl(var(--input-border))',
				'input-focus': 'hsl(var(--input-focus))',

				// Sidebar (keeping for component compatibility)
				sidebar: {
					DEFAULT: 'hsl(var(--background-soft))',
					foreground: 'hsl(var(--foreground))',
					primary: 'hsl(var(--flow-blue))',
					'primary-foreground': 'hsl(var(--background))',
					accent: 'hsl(var(--background-muted))',
					'accent-foreground': 'hsl(var(--foreground))',
					border: 'hsl(var(--card-border))',
					ring: 'hsl(var(--ring))'
				}
			},
			borderRadius: {
				lg: 'var(--radius-lg)',
				md: 'var(--radius)',
				sm: 'calc(var(--radius) - 2px)',
				xl: 'var(--radius-xl)'
			},
			spacing: {
				'18': '4.5rem',
				'88': '22rem',
				'128': '32rem'
			},
			minHeight: {
				'screen-safe': '100dvh'
			},
			backdropBlur: {
				'xs': '2px'
			},
			keyframes: {
				// Accordion animations (keeping for component compatibility)
				'accordion-down': {
					from: { height: '0' },
					to: { height: 'var(--radix-accordion-content-height)' }
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: '0' }
				},
				
				// UniFlow animations
				'fade-in-up': {
					'0%': {
						opacity: '0',
						transform: 'translateY(30px)'
					},
					'100%': {
						opacity: '1',
						transform: 'translateY(0)'
					}
				},
				'gradient-flow': {
					'0%, 100%': {
						'background-position': '0% 50%'
					},
					'50%': {
						'background-position': '100% 50%'
					}
				},
				'pulse-subtle': {
					'0%, 100%': {
						opacity: '1'
					},
					'50%': {
						opacity: '0.8'
					}
				},
				'slide-in-right': {
					'0%': { transform: 'translateX(100%)' },
					'100%': { transform: 'translateX(0)' }
				},
				'slide-out-right': {
					'0%': { transform: 'translateX(0)' },
					'100%': { transform: 'translateX(100%)' }
				},
				'scale-in': {
					'0%': {
						transform: 'scale(0.95)',
						opacity: '0'
					},
					'100%': {
						transform: 'scale(1)',
						opacity: '1'
					}
				},
				'float': {
					'0%, 100%': { transform: 'translateY(0px)' },
					'50%': { transform: 'translateY(-10px)' }
				}
			},
			animation: {
				// Component animations
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				
				// UniFlow animations
				'fade-in-up': 'fade-in-up 0.6s ease-out',
				'gradient-flow': 'gradient-flow 3s ease-in-out infinite',
				'pulse-subtle': 'pulse-subtle 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
				'slide-in-right': 'slide-in-right 0.3s ease-out',
				'slide-out-right': 'slide-out-right 0.3s ease-out',
				'scale-in': 'scale-in 0.2s ease-out',
				'float': 'float 3s ease-in-out infinite'
			},
			transitionDuration: {
				'400': '400ms',
			},
			boxShadow: {
				'glow': '0 0 40px hsl(var(--flow-blue) / 0.3)',
				'glow-red': '0 0 40px hsl(var(--uni-red) / 0.3)',
				'soft': '0 2px 8px hsl(220 43% 11% / 0.05)',
				'medium': '0 4px 16px hsl(220 43% 11% / 0.08)',
				'strong': '0 8px 32px hsl(220 43% 11% / 0.12)'
			},
			backgroundImage: {
				'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
				'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
				'dots': 'radial-gradient(circle at 2px 2px, hsl(var(--muted-foreground)) 1px, transparent 0)'
			},
			backgroundSize: {
				'dots': '32px 32px'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
