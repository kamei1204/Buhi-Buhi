import React from 'react';
import Header from '../components/Header';
import Cookie from 'universal-cookie';
import { useRouter } from 'next/router';

const cookie = new Cookie();

function Blog() {
    const router = useRouter();
    const logout = () => {
        cookie.remove("access_token")
        router.push("/")
    }
    return (
        <div>
            <Header />
            <button className="p-10" onClick={logout}/>
        </div>
    )}

export default Blog;
