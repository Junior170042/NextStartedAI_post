'use client'
import MyProfile from '@app/profile/page';
import { useSearchParams } from 'next/navigation';

const ProfileOther = () => {

    const searchParams = useSearchParams()
    const postCreatorIdAndUsername = searchParams.get('id')
    const parametters = postCreatorIdAndUsername?.split('/')

    const userId = parametters[0]
    const userName = parametters[1]
    return (
        <MyProfile username={userName} userId={userId} />
    );
}

export default ProfileOther;
