const userDetails = (userData, results) => {
	const user = `
				<div id="repo__user-container">
					<div id="repo__user-info">
						<div id="repo__user-image" style="background-image: url(${userData.avatar_url})">
							
						</div>

						<div id="repo__user-name">
							<h3>${userData.login}</h3>
							<p>${userData.name}</p>
						</div>
					</div>
					<div id="searchrepo__container">
						<i class="fas fa-search"></i>
						<input type="text" id="searchInput" placeholder="Enter repo name">
					</div>
					<div id="repo__user-count">
						<p><span>${results.length}</span>Repos</p>
					</div>
				</div>
	`

	return user
}

export default userDetails