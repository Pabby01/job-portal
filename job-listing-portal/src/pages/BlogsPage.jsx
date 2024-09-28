import '../styles/BlogsPage.css';

const BlogsPage = () => {
    const blogPosts = [
        {
            title: 'How to Ace Your Next Job Interview',
            date: 'September 15, 2024',
            excerpt:
                'Preparing for a job interview can be stressful, but with the right mindset and approach, you can nail it every time. Here are some tips...',
            link: '/blog/how-to-ace-your-next-job-interview',
        },
        {
            title: 'The Future of Remote Work',
            date: 'August 28, 2024',
            excerpt:
                'Remote work is here to stay. Learn about the emerging trends and how you can adapt to this new way of working...',
            link: '/blog/the-future-of-remote-work',
        },
        {
            title: 'Top 5 Skills Employers Look for in 2024',
            date: 'July 18, 2024',
            excerpt:
                'In today’s job market, employers are looking for specific skills. Discover the top 5 skills you need to stay competitive...',
            link: '/blog/top-5-skills-employers-look-for-in-2024',
        },
    ];

    return (
        <div className="blog">
            <section className="blog-hero">
                <div className="container">
                    <h1>Our Blog</h1>
                    <p>Stay updated with the latest insights, tips, and trends in the job market.</p>
                </div>
            </section>

            <section className="blog-posts">
                <div className="container">
                    {blogPosts.map((post, index) => (
                        <div className="blog-post" key={index}>
                            <h2>{post.title}</h2>
                            <p className="date">{post.date}</p>
                            <p>{post.excerpt}</p>
                            <a href={post.link} className="read-more">Read More</a>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}

export default BlogsPage
