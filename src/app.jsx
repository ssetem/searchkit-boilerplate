import * as React from "react";

import {
	SearchkitManager,
	SearchkitProvider,
	SearchBox,
	Hits
} from "searchkit";

require("./index.scss");

const host = "http://demo.searchkit.co/api/movies"
const sk = new SearchkitManager(host)

const MovieHitsItem = (props)=> {
	const {bemBlocks, result}= props
	let url = "http://www.imdb.com/title/" + result._source.imdbId
	return (
		<div className={bemBlocks.item().mix(bemBlocks.container("item"))} key={result._id}>
			<a href={url} target="_blank">
				<img className={bemBlocks.item("poster")} src={result._source.poster} width="180" height="270"/>
				<div className={bemBlocks.item("title")}>{result._source.title}</div>
			</a>
		</div>
	)
}

export default class App extends React.Component {
	render() {
		return (
		<div className="search-site">
			<SearchkitProvider searchkit={sk}>
				<div>
					<div className="search-site__query">
						<SearchBox autofocus={true} searchOnChange={true} queryFields={["actors^1","type^2","languages","title^5", "genres^2"]}/>
					</div>

					<div className="search-site__results">
						<Hits hitsPerPage={10} itemComponent={MovieHitsItem} sourceFilter={["title", "poster", "imdbId"]}/>
					</div>
				</div>
			</SearchkitProvider>
		</div>
		);
	}
}
