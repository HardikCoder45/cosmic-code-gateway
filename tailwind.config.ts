
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
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
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
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				},
				cosmic: {
					purple: '#9b87f5',
					deepPurple: '#7E69AB',
					darkPurple: '#1A1F2C',
					lightPurple: '#D6BCFA',
					blue: '#0EA5E9',
					pink: '#D946EF',
					orange: '#F97316',
					dark: '#0A051E',
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: { height: '0' },
					to: { height: 'var(--radix-accordion-content-height)' }
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: '0' }
				},
				'nebula-burst': {
					'0%': { transform: 'scale(0)', opacity: '0' },
					'50%': { transform: 'scale(1.2)', opacity: '0.8' },
					'100%': { transform: 'scale(1)', opacity: '1' }
				},
				'float': {
					'0%, 100%': { transform: 'translateY(0)' },
					'50%': { transform: 'translateY(-10px)' }
				},
				'orbit': {
					'0%': { transform: 'rotate(0deg) translateX(100px) rotate(0deg)' },
					'100%': { transform: 'rotate(360deg) translateX(100px) rotate(-360deg)' }
				},
				'orbit-reverse': {
					'0%': { transform: 'rotate(0deg) translateX(100px) rotate(0deg)' },
					'100%': { transform: 'rotate(-360deg) translateX(100px) rotate(360deg)' }
				},
				'pulse-glow': {
					'0%, 100%': { 
						boxShadow: '0 0 10px rgba(155, 135, 245, 0.6), 0 0 20px rgba(155, 135, 245, 0.4)'
					},
					'50%': { 
						boxShadow: '0 0 15px rgba(155, 135, 245, 0.8), 0 0 30px rgba(155, 135, 245, 0.6)'
					}
				},
				'star-twinkle': {
					'0%, 100%': { opacity: '1', transform: 'scale(1)' },
					'50%': { opacity: '0.5', transform: 'scale(0.8)' }
				},
				'wormhole': {
					'0%': { transform: 'scale(1) rotate(0deg)', opacity: '1' },
					'50%': { transform: 'scale(0) rotate(180deg)', opacity: '0' },
					'51%': { transform: 'scale(0) rotate(0deg)', opacity: '0' },
					'100%': { transform: 'scale(1) rotate(0deg)', opacity: '1' }
				},
				'binary-fade': {
					'0%': { opacity: '1', transform: 'translateY(0)' },
					'50%': { opacity: '0.5', transform: 'translateY(-5px)' },
					'100%': { opacity: '0', transform: 'translateY(-10px)' }
				},
				'form-beam-in': {
					'0%': { opacity: '0', transform: 'translateY(-20px)' },
					'100%': { opacity: '1', transform: 'translateY(0)' }
				},
				'black-hole-pulse': {
					'0%, 100%': { transform: 'scale(1)', boxShadow: '0 0 20px rgba(155, 135, 245, 0.6)' },
					'50%': { transform: 'scale(1.05)', boxShadow: '0 0 40px rgba(155, 135, 245, 0.8)' }
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'nebula-burst': 'nebula-burst 1.5s ease-out forwards',
				'float': 'float 3s ease-in-out infinite',
				'orbit': 'orbit 20s linear infinite',
				'orbit-reverse': 'orbit-reverse 15s linear infinite',
				'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
				'star-twinkle': 'star-twinkle 4s ease-in-out infinite',
				'wormhole': 'wormhole 1s ease-in-out',
				'binary-fade': 'binary-fade 1s ease-out',
				'form-beam-in': 'form-beam-in 0.5s ease-out forwards',
				'black-hole-pulse': 'black-hole-pulse 3s ease-in-out infinite'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
