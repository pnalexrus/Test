let data = null

const renderNews = (categoryId) => {
	fetch(
		'https://frontend.karpovcourses.net/api/v2/ru/news/' +
			(categoryId ? categoryId : '')
	)
		.then((response) => response.json())
		.then((responseData) => {
			data = responseData

			const mainNews = data.items.slice(0, 3)
			const smallNews = data.items.slice(3, 12)

			const mainNewsContainer = document.querySelector('.articles__big-column')
			const smallNewsContainer = document.querySelector(
				'.articles__small-column'
			)

			const escapeString = (string) => {
				const symbols = {
					'&': '&amp;',
					'<': '&lt;',
					'>': '&gt;',
				}

				return string.replace(/[&<>]/g, (tag) => {
					return symbols[tag] || tag
				})
			}

			mainNews.forEach((item) => {
				const template = document.createElement('template')
				const categoryData = data.categories.find(
					(categoryItem) => categoryItem.id === item.category_id
				)
				const sourceData = data.sources.find(
					(sourceItem) => sourceItem.id === item.source_id
				)

				template.innerHTML = `
		<article class="main-article">
				<div class="main-article__image-container">
					<img src="${encodeURI(
						item.image
					)}" alt="Фото новости" class="main-article__image">
				</div>
				<div class="main-article__content">
					<span class="article-category main-article__category">${escapeString(
						categoryData.name
					)}</span>
					<h2 class="main-article__title">${escapeString(item.title)} </h2>
					<p class="main-article__text">${escapeString(item.description)}</p>
					<span class="article-source main-article__source">${escapeString(
						sourceData.name
					)}</span>
				</div>
		</article>
	`

				mainNewsContainer.appendChild(template.content)
			})

			smallNews.forEach((item) => {
				const template = document.createElement('template')
				const sourceData = data.sources.find(
					(sourceItem) => sourceItem.id === item.source_id
				)
				const dateData = new Date(item.date).toLocaleDateString('ru-RU', {
					month: 'long',
					day: 'numeric',
				})

				template.innerHTML = `
	<article class="small-article">
		<h2 class="small-article__title">${escapeString(item.title)}</h2>
		<p class="small-article__caption">
			<span class="article-date small-article__date">${escapeString(dateData)}</span>
			<span class="article-source small-article__source">${escapeString(
				sourceData.name
			)}</span>
		</p>
	</article>
`
				smallNewsContainer.appendChild(template.content)
			})
		})
}
