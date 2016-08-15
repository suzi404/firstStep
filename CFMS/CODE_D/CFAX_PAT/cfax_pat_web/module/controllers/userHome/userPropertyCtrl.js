app.controller('userPropertyCtrl',['$scope','$rootScope', '$http','publicService','userProperty',
	function($scope, $rootScope, $http,publicService,userProperty) {

		$scope.isShowTranFinaing = true;
		$scope.isShowTranTransfer = false;
		$scope.isShowDialogTran = false;
		$scope.isOperatorSuccess = false;
		$scope.isShowOtherMem = true;
		$scope.rivals = [];
		$scope.showDiv = false;
		$scope.totalItems = 1;
		$scope.itemsPerPage = 10;
		$scope.currentPage = 1;

		// 查询融资交易列表
		$scope.queryTranFinaingLogs = function (flag) {
			if(flag){
				$scope.currentPage = 1;
			}
			var isAll = "";
				if ($scope.status == "" && $scope.status.length <= 0) {
					isAll = "false";
				}
				//提交数据
				$scope.formData = {
					pageNo: $scope.currentPage - 1,
					pageSize: $scope.itemsPerPage,
					"productNo": $scope.productNo,
					"productName": $scope.productName,
					"status": $scope.status,
					"isAll": isAll,
					"minAmt": $scope.minAmt,
					"maxAmt": $scope.maxAmt,
					"startDate": ($scope.vm1 == undefined ? "" : $scope.vm1.value),
					"endDate": ($scope.v2 == undefined ? "" : $scope.vm2.value)
				};
				userProperty.queryTranFinaingLogs($scope.formData, function (data) {
					if (data.errorCode == '0000') {
						if (data.list.length == 0)$scope.showDiv = true;
						$scope.tranFinaings = data.list;
						$scope.totalItems = data.total == false ? $scope.totalItems : data.total;
						$scope.totalPage = Math.ceil( data.total / $scope.itemsPerPage);

						angular.forEach(data.list, function (e, i) {
							publicService.getParaValue("FINAING_ST", e.status).then(function (res) {
								e.statusCH = res;
							});
						});

					} else if (data.errorCode == '9999') {
						console.log('未知异常');
					} else if (data.errorCode == '1001') {
						console.log('数据库审核失败');
					} else if (data.errorCode == '1002') {
						console.log('数据库审核异常');
					} else if (data.errorCode == '1003') {
						console.log('1003');
					} else if (data.errorCode == '1004') {
						console.log('1004');
					}
				});
		};

		$scope.queryTranFinaingLogs();

		// 查询受让信息列表
		$scope.queryTranTransferLogs = function (flag) {
			//提交数据
			$scope.formData = {
				pageNo: $scope.currentPage - 1,
				pageSize: $scope.itemsPerPage,
				"productNo": $scope.productNo,
				"productName": $scope.productName,
				"status": $scope.status,
				"startAmt": $scope.minAmt,
				"endAmt": $scope.maxAmt,
				"startDate": $scope.startDate,
				"endDate": $scope.endDate
			};
			userProperty.queryTranTransferLogs($scope.formData, function (data) {
				if (data.errorCode == '0000') {
					if (data.list.length == 0)$scope.showDiv = true;
					$scope.tranTransferList = data.list;
					$scope.totalItems = data.total == false ? $scope.totalItems : data.total;
					$scope.totalPage = Math.ceil( data.total / $scope.itemsPerPage);
					angular.forEach(data.list, function (e, i) {
						publicService.getParaValue("TRANSFER_ST", e.status).then(function (res) {
							e.statusCH = res;
						});
					});
				} else if (data.errorCode == '9999') {
					console.log('未知异常');
				} else if (data.errorCode == '1001') {
					console.log('数据库审核失败');
				} else if (data.errorCode == '1002') {
					console.log('数据库审核异常');
				} else if (data.errorCode == '1003') {
					console.log('1003');
				} else if (data.errorCode == '1004') {
					console.log('1004');
				}
			});
		};

		// 打开成交弹窗
		$scope.openDialogTran = function (obj, flagEdit) {
			//提交数据
			$scope.flagEdit = flagEdit;
			$scope.finaRrojNo = obj.finaRrojNo;
			$scope.formData = {
				"productNo": obj.productNo,
				"finaRrojNo": obj.finaRrojNo,
				"flagEdit": $scope.flagEdit
			};

			// 查询成交对手列表
			userProperty.queryTransferRivals($scope.formData, function (data) {
				if (data.errorCode == '0000') {
					// console.log(data);
					$scope.isShowDialogTran = true;
					$scope.rivals = data.list;
					$scope.tranFinaingInfo = data.tranFinaingInfo[0];
					$scope.fileName = (data.fileList[0] != undefined ? data.fileList[0].fileName : "");
					if (data.tranFinaingInfo[0].tradeDate) {
						var tempdate = data.tranFinaingInfo[0].tradeDate.substring(0, 4) + "-" + data.tranFinaingInfo[0].tradeDate.substring(4, 6) + "-" + data.tranFinaingInfo[0].tradeDate.substring(6, 8);
						$scope.vm.value = tempdate;
					} else {
						$scope.vm.value = "";
					}
				} else if (data.errorCode == '9999') {
					console.log('未知异常');
				} else if (data.errorCode == '1001') {
					console.log('数据库审核失败');
				} else if (data.errorCode == '1002') {
					console.log('数据库审核异常');
				} else if (data.errorCode == '1003') {

				} else if (data.errorCode == '1004') {

				}
			})

		}

		$scope.upContractAttach = function (formid, fileNoModel) {
			var uploadCertForm = $("#" + formid);
			var url = $scope.buildUrl("file.do", "upFile");
			uploadCertForm.prop("action", url);
			var options = {
				url: url,
				type: 'post',
				dataType: 'json',
				success: function (data) {
					console.log("上传附件成功");
					$scope.tranFinaingInfo.contractAttach = data.fileNo;
				}, error: function (data) {
					alert("上传文件失败");
					$scope.tranFinaingInfo.contractAttach = "";
				}
			};
			uploadCertForm.ajaxSubmit(options);
		}

		$scope.buildUrl = function (actionDo, actionUrl) {
			return '/cfax-proxy/' + actionDo + '?method=' + actionUrl;
		};

		// 融资管理成交
		$scope.comTranTransferLog = function () {
			$scope.memberNo = "";
			$scope.memberName = "";
			if ($scope.transactionRival && $scope.transactionRival.memberNo != '') {
				$scope.memberNo = $scope.transactionRival.memberNo;
				$scope.memberName = $scope.transactionRival.memberName;
			} else {
				$scope.memberNo = "";
				$scope.memberName = $scope.otherMem;
			}
			//提交数据
			$scope.formData = {
				"productNo": $scope.tranFinaingInfo.productNo,
				"productName": $scope.tranFinaingInfo.productName,
				"tradeAmt": $scope.tranFinaingInfo.tradeAmt,
				"contractAttach": $scope.tranFinaingInfo.contractAttach,
				"tradeDate": publicService.format($scope.vm.value, 'yyyy-MM-dd'),
				"flagEdit": $scope.flagEdit,
				"tradeObj": $scope.memberName,
				"finaRrojNo": $scope.finaRrojNo,
				"memberNo": $scope.memberNo
			};
			userProperty.comTranTransferLog($scope.formData, function (data) {
				if (data.errorCode == '0000') {
					$scope.tranFinaings = data.list;
					$scope.isShowDialogTran = false;
					$scope.isOperatorSuccess = true;
					// 刷新融资流水列表
					$scope.queryTranFinaingLogs();
				} else if (data.errorCode == '9999') {
					console.log('未知异常');
				} else if (data.errorCode == '1001') {
					console.log('操作失败');
				} else if (data.errorCode == '1002') {
					console.log('保存失败');
				} else if (data.errorCode == '1003') {

				} else if (data.errorCode == '1004') {

				}
			})
		};

		// 撤销
		$scope.revoke = function (obj) {
			$scope.formData = {
				"flowNo": obj.flowNo
			};
			userProperty.revokeTransfer($scope.formData, function (data) {
				if (data.errorCode == '0000') {
					$scope.passDialog("撤销受让成功");
				} else {
					$scope.failDialog("操作失败");
				}
			})
		};
		//分页监控
		$scope.search = function () {
			$scope.reset();
			if ($scope.isShowTranFinaing)$scope.queryTranFinaingLogs();
			if ($scope.isShowTranTransfer)$scope.queryTranTransferLogs();
		}
		// 关闭
		$scope.cancel = function () {
			$scope.isShowDialogTran = false;
		};

		// 融资交易详情
		$scope.tranFinaingDetail = function (obj) {
			window.location.href = "#/userHome/tranFinaingDetail/" + obj.finaRrojNo + "/" + obj.status + "/" + obj.productNo;
		};

		// 受让详情
		$scope.tranTransferDetail = function (obj) {
			window.location.href = "#/userHome/tranTransferDetail/" + obj.flowNo + "/" + obj.status + "/" + obj.productNo + "/" + obj.finaRrojNo;
		};

		// 修改融资申请
		$scope.modify = function (obj) {
			window.location.href = "#/userHome/editTranFinaing/" + obj.finaRrojNo + "/" + obj.status;
		};

		//动态切换tabs
		var $fundLi = $(".user-main-title.property-title li");
		$fundLi.on("click", function (e) {
			$scope.reset();
			$scope.totalItems = '';
			var optStr = '';
			var t = $(this).index();
			var suppStatus = $(this).attr("currentLi");
			e.stopPropagation();
			$fundLi.removeClass('li-selected');
			$(this).addClass('li-selected');
			$scope.currentPage = 1;
			if (suppStatus == "tranFinaingLi") {
				$scope.isShowTranFinaing = true;
				$scope.isShowTranTransfer = false;
				$scope.queryTranFinaingLogs(true);

				$(".property-cate-p2 ul li").eq(0).html("融资金额：");
				optStr += '<option value="">请选择项目状态</option>';
				optStr += '<option value="02">已申请，待平台审核</option>';
				optStr += '<option value="03">申请审核通过</option>';
				optStr += '<option value="04">申请被驳回</option>';
				optStr += '<option value="07">挂牌中</option>';
				optStr += '<option value="08">挂牌结束 </option>';
			} else {
				$scope.isShowTranFinaing = false;
				$scope.isShowTranTransfer = true;
				$scope.queryTranTransferLogs(true);
				$(".property-cate-p2 ul li").eq(0).html("受让金额：");
				optStr += '<option value="">请选择项目状态</option>';
				optStr += '<option value="01">待审核</option>';
				optStr += '<option value="02">已审核</option>';
				optStr += '<option value="03">审核驳回</option>';
				optStr += '<option value="04">接受</option>';
				optStr += '<option value="05">拒绝</option>';
				optStr += '<option value="07">交易成功</option>';
			}
			$("select[ng-model='status']").html(optStr);
		});

		// 提交表单
		$scope.submitForm = function () {
			var currentLi = $(".user-main-title.property-title li.li-selected").attr("currentLi");
			if (currentLi == "tranFinaingLi") {
				$scope.queryTranFinaingLogs(true);
			} else {
				$scope.queryTranTransferLogs(true);
			}
		}

		// 金额显示
		var $calcAmtLi = $("li[calcAmt]");
		$calcAmtLi.on("click", function (e) {
			var selectVal = $(this).attr("calcAmt");
			$calcAmtLi.find("span").removeClass("selected-color");
			$(this).find("span").addClass("selected-color");
			if (selectVal == "1") {
				$scope.minAmt = "100";
				$scope.maxAmt = "500";
				$("#minAmt").val("100");
				$("#maxAmt").val("500");
			} else if (selectVal == "2") {
				$scope.minAmt = "500";
				$scope.maxAmt = "1000";
				$("#minAmt").val("500");
				$("#maxAmt").val("1000");
			} else if (selectVal == "3") {
				$scope.minAmt = "1000";
				$scope.maxAmt = "5000";
				$("#minAmt").val("1000");
				$("#maxAmt").val("5000");
			} else if (selectVal == "4") {
				$scope.minAmt = "5000";
				$scope.maxAmt = "";
				$("#minAmt").val("5000");
				$("#maxAmt").val("");
			} else {
				$scope.minAmt = "";
				$scope.maxAmt = "";
				$("#minAmt").val("");
				$("#maxAmt").val("");
			}
		});

		// 修改选中日期区域
		var $changeDateLi = $("li[changeDate]");
		$changeDateLi.on("click", function (e) {
			var selectVal = $(this).attr("changeDate");
			var now = new Date();
			var editNow = new Date();
			var start = now;
			if (selectVal != "" && selectVal.length > 0) {
				now.beginTime = null;
				now.endTime = null;
				beginDate = new Date(now.getTime() - selectVal * 30 * 24 * 3600 * 1000);
				entDate = start;
				var beginDate = beginDate.getFullYear() + "-" + $scope.appendzero((beginDate.getMonth()) + 1) + "-" + $scope.appendzero(beginDate.getDate());
				var entDate = entDate.getFullYear() + "-" + $scope.appendzero((entDate.getMonth() + 1)) + "-" + $scope.appendzero(entDate.getDate());
				$("#startDate").val(beginDate);
				$("#endDate").val(entDate);

				$scope.vm1.value = beginDate;
				$scope.vm2.value = entDate;
			} else {
				beginDate = "";
				entDate = "";
				$scope.vm1.value = "";
				$scope.vm12.value = "";
			}

			$changeDateLi.find("span").removeClass("selected-color");
			$(this).find("span").addClass("selected-color");
		});

		$scope.appendzero = function (obj) {
			if (obj < 10) return "0" + obj; else return obj;
		}


		// 显示其他对手
		$scope.showOther = function (obj) {
			console.log(obj);
			if (obj && obj.memberNo != '') {
				$scope.isShowOtherMem = false;
			} else {
				$scope.isShowOtherMem = true;
			}
		};

		/**
		 * 重置查询条件
		 */
		$scope.reset = function () {
			$calcAmtLi.find("span").removeClass("selected-color");
			$changeDateLi.find("span").removeClass("selected-color");
			$scope.productNo = "";
			$scope.productName = "";
			$scope.status = "";
			$scope.minAmt = "";
			$scope.maxAmt = "";
			$scope.startDate = "";
			$scope.endDate = "";
			$("#minAmt").val("");
			$("#maxAmt").val("");
			$("#startDate").val("");
			$("#endDate").val("");
		};

		$scope.reset();     //清空查询条件

		//初始化日期
		$scope.vm = publicService.setDate();
		$scope.vm.today();
		$scope.vm1 = publicService.setDate();
		$scope.vm2 = publicService.setDate();

	}]);