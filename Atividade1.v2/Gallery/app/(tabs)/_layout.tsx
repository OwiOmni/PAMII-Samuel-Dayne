import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Tabs } from 'expo-router';
import React from 'react';

import { useColorScheme } from '@/hooks/use-color-scheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
      <Tabs>
<Tabs.Screen
         name='albuns'
          options={{
          title: 'Album',
          headerShown: false,
          tabBarIcon: ({ color }) => (
          <Ionicons name="albums" size={24} color="pink" />
           )
          }}
                    />
            <Tabs.Screen
                    name='fotos'
                    options={{
                        title: 'Fotos',
                        headerShown: false,
                        tabBarIcon: ({ color }) => (
                       <FontAwesome name="photo" size={24} color="pink" />
                            )
                        }}
                    />

           <Tabs.Screen
                    name='historias'
                    options={{
                        title: 'Historias',
                        headerShown: false,
                        tabBarIcon: ({ color }) => (
                       <AntDesign name="book" size={24} color="pink" />
                            )
                        }}
                    />

           <Tabs.Screen
                    name='menu'
                    options={{
                        title: 'Menu',
                        headerShown: false,
                        tabBarIcon: ({ color }) => (
                       <AntDesign name="menu" size={24} color="pink" />
                            )
                        }}
                    />

    </Tabs>

    
  );
}
