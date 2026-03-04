import AntDesign from '@expo/vector-icons/AntDesign';
import Entypo from '@expo/vector-icons/Entypo';
import Feather from '@expo/vector-icons/Feather';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Tabs } from 'expo-router';

export default function TabsLayout() {
    return (
        <Tabs>
            <Tabs.Screen
                name='index'
                options={{
                    title: 'Home',
                    headerShown: false,
                    tabBarIcon: ({ color }) => (
                    <Entypo name="home" size={24} color={color} />
                        )
                    }}
                />


        <Tabs.Screen
                name='friends'
                options={{
                    title: 'Friends',
                    tabBarIcon: ({ color }) => (
                    <Feather name="users" size={24} color={color} />
                    )
                }}
            />
    
            <Tabs.Screen
                    name='newPost'
                    options={{
                        title: 'New Post',
                        tabBarIcon: ({ color }) => (
                        <AntDesign name="plus" size={24} color={color} />
                        )
                    }}
                />
            <Tabs.Screen
                    name='inbox'
                    options={{
                        title: 'Inbox',
                        tabBarIcon: ({ color }) => (
                        <Ionicons name="chatbox-ellipses-outline" size={24} color={color} />
                        )
                    }}
                />



        <Tabs.Screen
                name='profile'
                options={{
                    title: 'Profile',
                    tabBarIcon: ({ color }) => (
                    <Feather name="user" size={24} color={color} />
                    )
                }}
            />
        </Tabs>

        
    )
}