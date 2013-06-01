test:
	NODE_ENV=test mocha

deploy:
	for file in ./public/src/css/*.less ; do \
		echo $$file ; \
		FROM=$$file ; \
		FROMFILE=`basename $$file .less` ; \
		TO="public/out/css/$${FROMFILE}.css" ; \
		lessc $$FROM $$TO ; \
	done 
	cp public/src/js/app.js public/out/js/app.js
	git add public/out
	git commit -m "Added gen files"
	git push origin master
	git push heroku master

clean:

.PHONY: deploy clean test
