import { DarkTheme, DefaultTheme, ThemeProvider } from "@react-navigation/native"
import { Stack } from "expo-router"
import { useColorScheme } from "react-native"

export default function RootLayout() {
    const colorScheme = useColorScheme()

    const myDarkTheme = {
        ...DarkTheme,
        colors: {
            ...DarkTheme.colors,
            primary: 'white',
        }
    }

    const myLightTheme = {
        ...DefaultTheme,
        colors: {
            ...DefaultTheme.colors,
            primary: '#000',
        }
    }

    const theme = colorScheme === 'dark' ? myDarkTheme : myLightTheme

    return (
        <ThemeProvider value={theme}>
            <Stack screenOptions={{ headerShown: false }} />
        </ThemeProvider>
    )
}