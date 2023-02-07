#!/bin/bash

if ( ${ENV} = "production" )
then
	npm run build
else
	npm run start
fi