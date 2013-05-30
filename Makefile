
deploy:
	lessc public/src/css/app.css public/out/css/app.css
	cp public/src/js/app.js public/out/js/app.js
	git push origin master
	git push heroku master
