import { Text, View } from 'react-native'
import { useEffect } from 'react'
import { useSession } from '@/utils/ctx';

const index = ({ test }: { test: string }) => {
    const { session, isLoading } = useSession();

    useEffect(() => {
        console.log(session);
      }, []);

    return (
        <View style={{paddingTop: 70}}>
            <Text>Attednants</Text>
        </View>
    )
}

export default index
