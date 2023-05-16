import { FC, ReactElement, useState, useEffect, useLayoutEffect } from 'react';
import { ThemeProvider } from '@emotion/react';

import { IconButton } from '@/components/IconButton';
import { StyledLink } from '@/components/StyledLink';
import { Themes } from '@/styles/themes';
import {
	Wrapper,
	LogoLink,
	StyledLogo,
	MainNav,
	SearchInput,
	Content,
	Footer,
} from './components';

type LayoutProps = {
	children?: ReactElement;
};

const useCustomLayoutEffect =
	typeof window !== 'undefined' ? useLayoutEffect : useEffect;

export const Layout: FC<LayoutProps> = ({ children }) => {
	const [isDark, setIsDark] = useState(false);
	const toggleDark = () => {
		localStorage.setItem('theme', isDark ? 'light' : 'dark');
		setIsDark(!isDark);
	};

	useCustomLayoutEffect(() => {
		const isDark = Boolean(localStorage.getItem('theme') === 'dark');
		setIsDark(
			window.matchMedia('prefers-color-scheme: dark').matches || isDark
		);
	}, []);

	const theme = Themes[isDark ? 'dark' : 'light'];

	return (
		<ThemeProvider theme={theme}>
			<Wrapper>
				<LogoLink href="/">
					<StyledLogo size={3}>
						<span className="logo_short">C8X</span>
						<span className="logo_full">CoursesBox</span>
					</StyledLogo>
				</LogoLink>
				<MainNav>
					<StyledLink href="/all">All</StyledLink>
					<StyledLink href="/login">
						<IconButton name="Login" size={1} />
					</StyledLink>
					<IconButton
						name={isDark ? 'Sun' : 'Moon'}
						size={1}
						onClick={toggleDark}
					/>
				</MainNav>
				<SearchInput icon="Search" placeholder="Search" onChange={() => null} />
				<Content>{children}</Content>
				<Footer>Footer</Footer>
			</Wrapper>
		</ThemeProvider>
	);
};
