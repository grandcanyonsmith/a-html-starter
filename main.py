import subprocess

def install_openai_package():
    try:
        # Run the pip3 install command
        subprocess.run(["pip3", "install", "openai"], check=True)
        print("Successfully installed the 'openai' package.")
    except subprocess.CalledProcessError as e:
        # If an error occurs during the installation process,
        # it will be caught here
        print(f"An error occurred while installing the 'openai' package: {e}")

if __name__ == "__main__":
    install_openai_package()