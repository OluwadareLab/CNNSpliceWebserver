def app_init():

	parser = argparse.ArgumentParser()
	parser = argparse.ArgumentParser()
	parser.add_argument("-t", "--modeltype", type=str, required=True, help="acceptor or donor model and organism name")
	parser.add_argument("-f", "--filename", type=str, required=True, help="name of the input fasta file")
	parser.add_argument("-l", "--location", type=str, required=True, help="directory name to save results")

	args = parser.parse_args()
	modeltype = args.modeltype
	filename = args.filename
	dirloc = args.location
	mkdir_p(dirloc+"/")

	main(modeltype, filename, dirloc)


if __name__ == '__main__':
	app_init()