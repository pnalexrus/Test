const categoryIds = {
	index: 0,
	fashion: 3,
	technologies: 1,
	sport: 2,
	politics: 6
}

const categoryNames = {
	index: 'Главная',
	fashion: 'Мода',
	technologies: 'Технологии',
	sport: 'Спорт',
	politics: 'Политика'
}

const Navigation = ({ onNavClick, currentCategory, className = '' }) => {
	return (
		<nav className={`navigation grid ${className}`}>
			<a href="#" data-href="index" className="navigation__logo">
				<img
					className="navigation__image"
					src="images/logo.svg"
					alt="Логотип"
				/>
			</a>
			<ul className="navigation__list">
				{['index', 'fashion', 'technologies', 'sport', 'politics'].map((item) => {
					return (
						<li className="navigation__item" key={item}>
							<a
								onClick={onNavClick}
								data-href={item}
								className={`navigation__link ${currentCategory === item ? 'navigation__link--active' : ''}`}
								href="#"
							>
								{categoryNames[item]}
							</a>
						</li>
					)
				})}

			</ul>
		</nav>
	)
}

const MainArticle = ({ title, image, category, description, source }) => {
	return (
		<article className="main-article">
			<div className="main-article__image-container">
				<img src={image} alt="Фото новости" className="main-article__image" />
			</div>
			<div className="main-article__content">
				<span className="article-category main-article__category">
					{category}
				</span>
				<h2 className="main-article__title">
					{title}
				</h2>
				<p className="main-article__text">
					{description}
				</p>
				<span className="article-source main-article__source">
					{source}
				</span>
			</div>
		</article>
	)
}

const SmallArticle = ({ title, source, date }) => {
	return (
		<article className="small-article">
			<h2 className="small-article__title">
				{title}
			</h2>
			<p className="small-article__caption">
				<span className="article-date small-article__date">
					{source}
				</span>
				<span className="article-source small-article__source">
					{new Date(date).toLocaleDateString('ru-RU', {
						month: 'long',
						day: 'numeric'
					})}
				</span>
			</p>
		</article>
	)
}

const App = () => {
	const [category, setCategory] = React.useState('index')
	const [articles, setArticles] = React.useState({
		items: [],
		categories: [],
		sources: [],
	})

	const onNavClick = (e) => {
		e.preventDefault()
		setCategory(e.currentTarget.dataset.href)
	}

	React.useEffect(() => {
		fetch('https://frontend.karpovcourses.net/api/v2/ru/news/' + categoryIds[category] || '')
			.then((response) => response.json())
			.then((response) => {
				setArticles(response)
			})
	}, [category])

	return (
		<React.Fragment>
			<header className="header">
				<div className="container">
					<Navigation
						className="header__navigation"
						onNavClick={onNavClick}
						currentCategory={category}
					/>
				</div>
			</header>

			<main className="main">
				<section className="articles">
					<div className="container grid">
						<section className="articles__big-column">
							{articles.items.slice(0, 3).map((item) => {
								return (
									<MainArticle
										key={item.title}
										title={item.title}
										description={item.description}
										image={item.image}
										category={articles.categories.find(({ id }) => item.category_id === id).name}
										source={articles.sources.find(({ id }) => item.source_id === id).name}
									/>
								)
							})}
						</section>

						<section className="articles__small-column">
							{articles.items.slice(3, 12).map((item) => {
								return (
									<SmallArticle
										key={item.title}
										title={item.title}
										source={articles.sources.find(({ id }) => item.source_id === id).name}
										date={item.date}
									/>
								)
							})}
						</section>
					</div>
				</section>
			</main>

			<footer className="footer">
				<div className="container">
					<Navigation
						className="footer__navigation"
						onNavClick={onNavClick}
						currentCategory={category}
					/>
					<div className="footer__column">
						<p className="footer__text">
							Сделано на Frontend курсе в {' '}
							<a href="https://ya.ru" target="_blank" className="footer__link">
								Pnalex
							</a>
						</p>
						<p className="footer__copyright">© 2021</p>
					</div>
				</div>
			</footer>
		</React.Fragment>
	)
}

ReactDOM.render(<App />, document.getElementById('root'))
