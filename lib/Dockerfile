FROM quay.io/vorterx/vorterx:latest
RUN git clone https://github.com/Vorterx/Aztec-MD /root/vorterx
WORKDIR /root/vorterx/
RUN npm install
EXPOSE 5000
CMD ["node", "core.js"]
